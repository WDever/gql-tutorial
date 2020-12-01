import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
  Query,
} from 'type-graphql';
import { Context } from 'types';
import { User } from 'entities/user';
import argon2 from 'argon2';
import { EntityManager } from '@mikro-orm/postgresql';
import { COOKIE_NAME } from '../constants';

@InputType()
class UsernamePasswordInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
class FieldError {
  @Field(() => String)
  field: string;

  @Field(() => String)
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: Context): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em, req }: Context,
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'length must be greater than 2',
          },
        ],
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: 'password',
            message: 'length must be greater than 2',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;

    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning('*');

      [user] = result;
    } catch (e) {
      if (e.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        };
      }
      console.log(`message: ${e.message}`);
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em, req }: Context,
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });

    if (user === null) {
      return {
        errors: [
          {
            field: 'username',
            message: `that username doesn't exist`,
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (valid === false) {
      return {
        errors: [
          {
            field: 'password',
            message: `incorrect password`,
          },
        ],
      };
    }

    req.session!.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context): Promise<unknown> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      }),
    );
  }
}
