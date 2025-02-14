
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PayList
 * 
 */
export type PayList = $Result.DefaultSelection<Prisma.$PayListPayload>
/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model Companyname
 * 
 */
export type Companyname = $Result.DefaultSelection<Prisma.$CompanynamePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PayLists
 * const payLists = await prisma.payList.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PayLists
   * const payLists = await prisma.payList.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.payList`: Exposes CRUD operations for the **PayList** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PayLists
    * const payLists = await prisma.payList.findMany()
    * ```
    */
  get payList(): Prisma.PayListDelegate<ExtArgs>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs>;

  /**
   * `prisma.companyname`: Exposes CRUD operations for the **Companyname** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companynames
    * const companynames = await prisma.companyname.findMany()
    * ```
    */
  get companyname(): Prisma.CompanynameDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.16.1
   * Query Engine version: 34ace0eb2704183d2c05b60b52fba5c43c13f303
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PayList: 'PayList',
    Users: 'Users',
    Companyname: 'Companyname'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "payList" | "users" | "companyname"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PayList: {
        payload: Prisma.$PayListPayload<ExtArgs>
        fields: Prisma.PayListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload>
          }
          findFirst: {
            args: Prisma.PayListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload>
          }
          findMany: {
            args: Prisma.PayListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload>[]
          }
          create: {
            args: Prisma.PayListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload>
          }
          createMany: {
            args: Prisma.PayListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload>[]
          }
          delete: {
            args: Prisma.PayListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload>
          }
          update: {
            args: Prisma.PayListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload>
          }
          deleteMany: {
            args: Prisma.PayListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PayListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayListPayload>
          }
          aggregate: {
            args: Prisma.PayListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayList>
          }
          groupBy: {
            args: Prisma.PayListGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayListGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayListCountArgs<ExtArgs>
            result: $Utils.Optional<PayListCountAggregateOutputType> | number
          }
        }
      }
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      Companyname: {
        payload: Prisma.$CompanynamePayload<ExtArgs>
        fields: Prisma.CompanynameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanynameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanynameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload>
          }
          findFirst: {
            args: Prisma.CompanynameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanynameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload>
          }
          findMany: {
            args: Prisma.CompanynameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload>[]
          }
          create: {
            args: Prisma.CompanynameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload>
          }
          createMany: {
            args: Prisma.CompanynameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanynameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload>[]
          }
          delete: {
            args: Prisma.CompanynameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload>
          }
          update: {
            args: Prisma.CompanynameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload>
          }
          deleteMany: {
            args: Prisma.CompanynameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanynameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanynameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanynamePayload>
          }
          aggregate: {
            args: Prisma.CompanynameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyname>
          }
          groupBy: {
            args: Prisma.CompanynameGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanynameGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanynameCountArgs<ExtArgs>
            result: $Utils.Optional<CompanynameCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model PayList
   */

  export type AggregatePayList = {
    _count: PayListCountAggregateOutputType | null
    _min: PayListMinAggregateOutputType | null
    _max: PayListMaxAggregateOutputType | null
  }

  export type PayListMinAggregateOutputType = {
    unique_id: string | null
    doc_no: string | null
    trans_type: string | null
    due_date: string | null
    recipient: string | null
    amount: string | null
    upload_at: Date | null
  }

  export type PayListMaxAggregateOutputType = {
    unique_id: string | null
    doc_no: string | null
    trans_type: string | null
    due_date: string | null
    recipient: string | null
    amount: string | null
    upload_at: Date | null
  }

  export type PayListCountAggregateOutputType = {
    unique_id: number
    doc_no: number
    trans_type: number
    due_date: number
    recipient: number
    amount: number
    upload_at: number
    _all: number
  }


  export type PayListMinAggregateInputType = {
    unique_id?: true
    doc_no?: true
    trans_type?: true
    due_date?: true
    recipient?: true
    amount?: true
    upload_at?: true
  }

  export type PayListMaxAggregateInputType = {
    unique_id?: true
    doc_no?: true
    trans_type?: true
    due_date?: true
    recipient?: true
    amount?: true
    upload_at?: true
  }

  export type PayListCountAggregateInputType = {
    unique_id?: true
    doc_no?: true
    trans_type?: true
    due_date?: true
    recipient?: true
    amount?: true
    upload_at?: true
    _all?: true
  }

  export type PayListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayList to aggregate.
     */
    where?: PayListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayLists to fetch.
     */
    orderBy?: PayListOrderByWithRelationInput | PayListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PayLists
    **/
    _count?: true | PayListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayListMaxAggregateInputType
  }

  export type GetPayListAggregateType<T extends PayListAggregateArgs> = {
        [P in keyof T & keyof AggregatePayList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayList[P]>
      : GetScalarType<T[P], AggregatePayList[P]>
  }




  export type PayListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayListWhereInput
    orderBy?: PayListOrderByWithAggregationInput | PayListOrderByWithAggregationInput[]
    by: PayListScalarFieldEnum[] | PayListScalarFieldEnum
    having?: PayListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayListCountAggregateInputType | true
    _min?: PayListMinAggregateInputType
    _max?: PayListMaxAggregateInputType
  }

  export type PayListGroupByOutputType = {
    unique_id: string
    doc_no: string | null
    trans_type: string | null
    due_date: string | null
    recipient: string | null
    amount: string | null
    upload_at: Date
    _count: PayListCountAggregateOutputType | null
    _min: PayListMinAggregateOutputType | null
    _max: PayListMaxAggregateOutputType | null
  }

  type GetPayListGroupByPayload<T extends PayListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayListGroupByOutputType[P]>
            : GetScalarType<T[P], PayListGroupByOutputType[P]>
        }
      >
    >


  export type PayListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    unique_id?: boolean
    doc_no?: boolean
    trans_type?: boolean
    due_date?: boolean
    recipient?: boolean
    amount?: boolean
    upload_at?: boolean
  }, ExtArgs["result"]["payList"]>

  export type PayListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    unique_id?: boolean
    doc_no?: boolean
    trans_type?: boolean
    due_date?: boolean
    recipient?: boolean
    amount?: boolean
    upload_at?: boolean
  }, ExtArgs["result"]["payList"]>

  export type PayListSelectScalar = {
    unique_id?: boolean
    doc_no?: boolean
    trans_type?: boolean
    due_date?: boolean
    recipient?: boolean
    amount?: boolean
    upload_at?: boolean
  }


  export type $PayListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PayList"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      unique_id: string
      doc_no: string | null
      trans_type: string | null
      due_date: string | null
      recipient: string | null
      amount: string | null
      upload_at: Date
    }, ExtArgs["result"]["payList"]>
    composites: {}
  }

  type PayListGetPayload<S extends boolean | null | undefined | PayListDefaultArgs> = $Result.GetResult<Prisma.$PayListPayload, S>

  type PayListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PayListFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PayListCountAggregateInputType | true
    }

  export interface PayListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PayList'], meta: { name: 'PayList' } }
    /**
     * Find zero or one PayList that matches the filter.
     * @param {PayListFindUniqueArgs} args - Arguments to find a PayList
     * @example
     * // Get one PayList
     * const payList = await prisma.payList.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayListFindUniqueArgs>(args: SelectSubset<T, PayListFindUniqueArgs<ExtArgs>>): Prisma__PayListClient<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PayList that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PayListFindUniqueOrThrowArgs} args - Arguments to find a PayList
     * @example
     * // Get one PayList
     * const payList = await prisma.payList.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayListFindUniqueOrThrowArgs>(args: SelectSubset<T, PayListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayListClient<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PayList that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayListFindFirstArgs} args - Arguments to find a PayList
     * @example
     * // Get one PayList
     * const payList = await prisma.payList.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayListFindFirstArgs>(args?: SelectSubset<T, PayListFindFirstArgs<ExtArgs>>): Prisma__PayListClient<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PayList that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayListFindFirstOrThrowArgs} args - Arguments to find a PayList
     * @example
     * // Get one PayList
     * const payList = await prisma.payList.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayListFindFirstOrThrowArgs>(args?: SelectSubset<T, PayListFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayListClient<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PayLists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayLists
     * const payLists = await prisma.payList.findMany()
     * 
     * // Get first 10 PayLists
     * const payLists = await prisma.payList.findMany({ take: 10 })
     * 
     * // Only select the `unique_id`
     * const payListWithUnique_idOnly = await prisma.payList.findMany({ select: { unique_id: true } })
     * 
     */
    findMany<T extends PayListFindManyArgs>(args?: SelectSubset<T, PayListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PayList.
     * @param {PayListCreateArgs} args - Arguments to create a PayList.
     * @example
     * // Create one PayList
     * const PayList = await prisma.payList.create({
     *   data: {
     *     // ... data to create a PayList
     *   }
     * })
     * 
     */
    create<T extends PayListCreateArgs>(args: SelectSubset<T, PayListCreateArgs<ExtArgs>>): Prisma__PayListClient<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PayLists.
     * @param {PayListCreateManyArgs} args - Arguments to create many PayLists.
     * @example
     * // Create many PayLists
     * const payList = await prisma.payList.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayListCreateManyArgs>(args?: SelectSubset<T, PayListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PayLists and returns the data saved in the database.
     * @param {PayListCreateManyAndReturnArgs} args - Arguments to create many PayLists.
     * @example
     * // Create many PayLists
     * const payList = await prisma.payList.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PayLists and only return the `unique_id`
     * const payListWithUnique_idOnly = await prisma.payList.createManyAndReturn({ 
     *   select: { unique_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayListCreateManyAndReturnArgs>(args?: SelectSubset<T, PayListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PayList.
     * @param {PayListDeleteArgs} args - Arguments to delete one PayList.
     * @example
     * // Delete one PayList
     * const PayList = await prisma.payList.delete({
     *   where: {
     *     // ... filter to delete one PayList
     *   }
     * })
     * 
     */
    delete<T extends PayListDeleteArgs>(args: SelectSubset<T, PayListDeleteArgs<ExtArgs>>): Prisma__PayListClient<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PayList.
     * @param {PayListUpdateArgs} args - Arguments to update one PayList.
     * @example
     * // Update one PayList
     * const payList = await prisma.payList.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayListUpdateArgs>(args: SelectSubset<T, PayListUpdateArgs<ExtArgs>>): Prisma__PayListClient<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PayLists.
     * @param {PayListDeleteManyArgs} args - Arguments to filter PayLists to delete.
     * @example
     * // Delete a few PayLists
     * const { count } = await prisma.payList.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayListDeleteManyArgs>(args?: SelectSubset<T, PayListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayLists
     * const payList = await prisma.payList.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayListUpdateManyArgs>(args: SelectSubset<T, PayListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PayList.
     * @param {PayListUpsertArgs} args - Arguments to update or create a PayList.
     * @example
     * // Update or create a PayList
     * const payList = await prisma.payList.upsert({
     *   create: {
     *     // ... data to create a PayList
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayList we want to update
     *   }
     * })
     */
    upsert<T extends PayListUpsertArgs>(args: SelectSubset<T, PayListUpsertArgs<ExtArgs>>): Prisma__PayListClient<$Result.GetResult<Prisma.$PayListPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PayLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayListCountArgs} args - Arguments to filter PayLists to count.
     * @example
     * // Count the number of PayLists
     * const count = await prisma.payList.count({
     *   where: {
     *     // ... the filter for the PayLists we want to count
     *   }
     * })
    **/
    count<T extends PayListCountArgs>(
      args?: Subset<T, PayListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PayList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PayListAggregateArgs>(args: Subset<T, PayListAggregateArgs>): Prisma.PrismaPromise<GetPayListAggregateType<T>>

    /**
     * Group by PayList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayListGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PayListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayListGroupByArgs['orderBy'] }
        : { orderBy?: PayListGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PayListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PayList model
   */
  readonly fields: PayListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PayList.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PayList model
   */ 
  interface PayListFieldRefs {
    readonly unique_id: FieldRef<"PayList", 'String'>
    readonly doc_no: FieldRef<"PayList", 'String'>
    readonly trans_type: FieldRef<"PayList", 'String'>
    readonly due_date: FieldRef<"PayList", 'String'>
    readonly recipient: FieldRef<"PayList", 'String'>
    readonly amount: FieldRef<"PayList", 'String'>
    readonly upload_at: FieldRef<"PayList", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PayList findUnique
   */
  export type PayListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * Filter, which PayList to fetch.
     */
    where: PayListWhereUniqueInput
  }

  /**
   * PayList findUniqueOrThrow
   */
  export type PayListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * Filter, which PayList to fetch.
     */
    where: PayListWhereUniqueInput
  }

  /**
   * PayList findFirst
   */
  export type PayListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * Filter, which PayList to fetch.
     */
    where?: PayListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayLists to fetch.
     */
    orderBy?: PayListOrderByWithRelationInput | PayListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayLists.
     */
    cursor?: PayListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayLists.
     */
    distinct?: PayListScalarFieldEnum | PayListScalarFieldEnum[]
  }

  /**
   * PayList findFirstOrThrow
   */
  export type PayListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * Filter, which PayList to fetch.
     */
    where?: PayListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayLists to fetch.
     */
    orderBy?: PayListOrderByWithRelationInput | PayListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayLists.
     */
    cursor?: PayListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayLists.
     */
    distinct?: PayListScalarFieldEnum | PayListScalarFieldEnum[]
  }

  /**
   * PayList findMany
   */
  export type PayListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * Filter, which PayLists to fetch.
     */
    where?: PayListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayLists to fetch.
     */
    orderBy?: PayListOrderByWithRelationInput | PayListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PayLists.
     */
    cursor?: PayListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayLists.
     */
    skip?: number
    distinct?: PayListScalarFieldEnum | PayListScalarFieldEnum[]
  }

  /**
   * PayList create
   */
  export type PayListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * The data needed to create a PayList.
     */
    data?: XOR<PayListCreateInput, PayListUncheckedCreateInput>
  }

  /**
   * PayList createMany
   */
  export type PayListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayLists.
     */
    data: PayListCreateManyInput | PayListCreateManyInput[]
  }

  /**
   * PayList createManyAndReturn
   */
  export type PayListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PayLists.
     */
    data: PayListCreateManyInput | PayListCreateManyInput[]
  }

  /**
   * PayList update
   */
  export type PayListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * The data needed to update a PayList.
     */
    data: XOR<PayListUpdateInput, PayListUncheckedUpdateInput>
    /**
     * Choose, which PayList to update.
     */
    where: PayListWhereUniqueInput
  }

  /**
   * PayList updateMany
   */
  export type PayListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PayLists.
     */
    data: XOR<PayListUpdateManyMutationInput, PayListUncheckedUpdateManyInput>
    /**
     * Filter which PayLists to update
     */
    where?: PayListWhereInput
  }

  /**
   * PayList upsert
   */
  export type PayListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * The filter to search for the PayList to update in case it exists.
     */
    where: PayListWhereUniqueInput
    /**
     * In case the PayList found by the `where` argument doesn't exist, create a new PayList with this data.
     */
    create: XOR<PayListCreateInput, PayListUncheckedCreateInput>
    /**
     * In case the PayList was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayListUpdateInput, PayListUncheckedUpdateInput>
  }

  /**
   * PayList delete
   */
  export type PayListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
    /**
     * Filter which PayList to delete.
     */
    where: PayListWhereUniqueInput
  }

  /**
   * PayList deleteMany
   */
  export type PayListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayLists to delete
     */
    where?: PayListWhereInput
  }

  /**
   * PayList without action
   */
  export type PayListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayList
     */
    select?: PayListSelect<ExtArgs> | null
  }


  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    status: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    status: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    role: number
    status: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    status?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    status?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    status?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    name: string
    role: string | null
    status: string | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    status?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    status?: boolean
  }, ExtArgs["result"]["users"]>

  export type UsersSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    status?: boolean
  }


  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      role: string | null
      status: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UsersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsersCreateManyAndReturnArgs>(args?: SelectSubset<T, UsersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Users model
   */ 
  interface UsersFieldRefs {
    readonly id: FieldRef<"Users", 'String'>
    readonly name: FieldRef<"Users", 'String'>
    readonly role: FieldRef<"Users", 'String'>
    readonly status: FieldRef<"Users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
  }

  /**
   * Users createManyAndReturn
   */
  export type UsersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
  }


  /**
   * Model Companyname
   */

  export type AggregateCompanyname = {
    _count: CompanynameCountAggregateOutputType | null
    _avg: CompanynameAvgAggregateOutputType | null
    _sum: CompanynameSumAggregateOutputType | null
    _min: CompanynameMinAggregateOutputType | null
    _max: CompanynameMaxAggregateOutputType | null
  }

  export type CompanynameAvgAggregateOutputType = {
    id: number | null
  }

  export type CompanynameSumAggregateOutputType = {
    id: number | null
  }

  export type CompanynameMinAggregateOutputType = {
    id: number | null
    short_name: string | null
    full_name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CompanynameMaxAggregateOutputType = {
    id: number | null
    short_name: string | null
    full_name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CompanynameCountAggregateOutputType = {
    id: number
    short_name: number
    full_name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CompanynameAvgAggregateInputType = {
    id?: true
  }

  export type CompanynameSumAggregateInputType = {
    id?: true
  }

  export type CompanynameMinAggregateInputType = {
    id?: true
    short_name?: true
    full_name?: true
    created_at?: true
    updated_at?: true
  }

  export type CompanynameMaxAggregateInputType = {
    id?: true
    short_name?: true
    full_name?: true
    created_at?: true
    updated_at?: true
  }

  export type CompanynameCountAggregateInputType = {
    id?: true
    short_name?: true
    full_name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CompanynameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companyname to aggregate.
     */
    where?: CompanynameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companynames to fetch.
     */
    orderBy?: CompanynameOrderByWithRelationInput | CompanynameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanynameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companynames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companynames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companynames
    **/
    _count?: true | CompanynameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanynameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanynameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanynameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanynameMaxAggregateInputType
  }

  export type GetCompanynameAggregateType<T extends CompanynameAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyname]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyname[P]>
      : GetScalarType<T[P], AggregateCompanyname[P]>
  }




  export type CompanynameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanynameWhereInput
    orderBy?: CompanynameOrderByWithAggregationInput | CompanynameOrderByWithAggregationInput[]
    by: CompanynameScalarFieldEnum[] | CompanynameScalarFieldEnum
    having?: CompanynameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanynameCountAggregateInputType | true
    _avg?: CompanynameAvgAggregateInputType
    _sum?: CompanynameSumAggregateInputType
    _min?: CompanynameMinAggregateInputType
    _max?: CompanynameMaxAggregateInputType
  }

  export type CompanynameGroupByOutputType = {
    id: number
    short_name: string
    full_name: string
    created_at: Date
    updated_at: Date
    _count: CompanynameCountAggregateOutputType | null
    _avg: CompanynameAvgAggregateOutputType | null
    _sum: CompanynameSumAggregateOutputType | null
    _min: CompanynameMinAggregateOutputType | null
    _max: CompanynameMaxAggregateOutputType | null
  }

  type GetCompanynameGroupByPayload<T extends CompanynameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanynameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanynameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanynameGroupByOutputType[P]>
            : GetScalarType<T[P], CompanynameGroupByOutputType[P]>
        }
      >
    >


  export type CompanynameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    short_name?: boolean
    full_name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["companyname"]>

  export type CompanynameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    short_name?: boolean
    full_name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["companyname"]>

  export type CompanynameSelectScalar = {
    id?: boolean
    short_name?: boolean
    full_name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }


  export type $CompanynamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Companyname"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      short_name: string
      full_name: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["companyname"]>
    composites: {}
  }

  type CompanynameGetPayload<S extends boolean | null | undefined | CompanynameDefaultArgs> = $Result.GetResult<Prisma.$CompanynamePayload, S>

  type CompanynameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompanynameFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompanynameCountAggregateInputType | true
    }

  export interface CompanynameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Companyname'], meta: { name: 'Companyname' } }
    /**
     * Find zero or one Companyname that matches the filter.
     * @param {CompanynameFindUniqueArgs} args - Arguments to find a Companyname
     * @example
     * // Get one Companyname
     * const companyname = await prisma.companyname.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanynameFindUniqueArgs>(args: SelectSubset<T, CompanynameFindUniqueArgs<ExtArgs>>): Prisma__CompanynameClient<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Companyname that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompanynameFindUniqueOrThrowArgs} args - Arguments to find a Companyname
     * @example
     * // Get one Companyname
     * const companyname = await prisma.companyname.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanynameFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanynameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanynameClient<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Companyname that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanynameFindFirstArgs} args - Arguments to find a Companyname
     * @example
     * // Get one Companyname
     * const companyname = await prisma.companyname.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanynameFindFirstArgs>(args?: SelectSubset<T, CompanynameFindFirstArgs<ExtArgs>>): Prisma__CompanynameClient<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Companyname that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanynameFindFirstOrThrowArgs} args - Arguments to find a Companyname
     * @example
     * // Get one Companyname
     * const companyname = await prisma.companyname.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanynameFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanynameFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanynameClient<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Companynames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanynameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companynames
     * const companynames = await prisma.companyname.findMany()
     * 
     * // Get first 10 Companynames
     * const companynames = await prisma.companyname.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companynameWithIdOnly = await prisma.companyname.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanynameFindManyArgs>(args?: SelectSubset<T, CompanynameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Companyname.
     * @param {CompanynameCreateArgs} args - Arguments to create a Companyname.
     * @example
     * // Create one Companyname
     * const Companyname = await prisma.companyname.create({
     *   data: {
     *     // ... data to create a Companyname
     *   }
     * })
     * 
     */
    create<T extends CompanynameCreateArgs>(args: SelectSubset<T, CompanynameCreateArgs<ExtArgs>>): Prisma__CompanynameClient<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Companynames.
     * @param {CompanynameCreateManyArgs} args - Arguments to create many Companynames.
     * @example
     * // Create many Companynames
     * const companyname = await prisma.companyname.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanynameCreateManyArgs>(args?: SelectSubset<T, CompanynameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companynames and returns the data saved in the database.
     * @param {CompanynameCreateManyAndReturnArgs} args - Arguments to create many Companynames.
     * @example
     * // Create many Companynames
     * const companyname = await prisma.companyname.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companynames and only return the `id`
     * const companynameWithIdOnly = await prisma.companyname.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanynameCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanynameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Companyname.
     * @param {CompanynameDeleteArgs} args - Arguments to delete one Companyname.
     * @example
     * // Delete one Companyname
     * const Companyname = await prisma.companyname.delete({
     *   where: {
     *     // ... filter to delete one Companyname
     *   }
     * })
     * 
     */
    delete<T extends CompanynameDeleteArgs>(args: SelectSubset<T, CompanynameDeleteArgs<ExtArgs>>): Prisma__CompanynameClient<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Companyname.
     * @param {CompanynameUpdateArgs} args - Arguments to update one Companyname.
     * @example
     * // Update one Companyname
     * const companyname = await prisma.companyname.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanynameUpdateArgs>(args: SelectSubset<T, CompanynameUpdateArgs<ExtArgs>>): Prisma__CompanynameClient<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Companynames.
     * @param {CompanynameDeleteManyArgs} args - Arguments to filter Companynames to delete.
     * @example
     * // Delete a few Companynames
     * const { count } = await prisma.companyname.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanynameDeleteManyArgs>(args?: SelectSubset<T, CompanynameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companynames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanynameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companynames
     * const companyname = await prisma.companyname.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanynameUpdateManyArgs>(args: SelectSubset<T, CompanynameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Companyname.
     * @param {CompanynameUpsertArgs} args - Arguments to update or create a Companyname.
     * @example
     * // Update or create a Companyname
     * const companyname = await prisma.companyname.upsert({
     *   create: {
     *     // ... data to create a Companyname
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Companyname we want to update
     *   }
     * })
     */
    upsert<T extends CompanynameUpsertArgs>(args: SelectSubset<T, CompanynameUpsertArgs<ExtArgs>>): Prisma__CompanynameClient<$Result.GetResult<Prisma.$CompanynamePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Companynames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanynameCountArgs} args - Arguments to filter Companynames to count.
     * @example
     * // Count the number of Companynames
     * const count = await prisma.companyname.count({
     *   where: {
     *     // ... the filter for the Companynames we want to count
     *   }
     * })
    **/
    count<T extends CompanynameCountArgs>(
      args?: Subset<T, CompanynameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanynameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Companyname.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanynameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanynameAggregateArgs>(args: Subset<T, CompanynameAggregateArgs>): Prisma.PrismaPromise<GetCompanynameAggregateType<T>>

    /**
     * Group by Companyname.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanynameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanynameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanynameGroupByArgs['orderBy'] }
        : { orderBy?: CompanynameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanynameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanynameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Companyname model
   */
  readonly fields: CompanynameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Companyname.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanynameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Companyname model
   */ 
  interface CompanynameFieldRefs {
    readonly id: FieldRef<"Companyname", 'Int'>
    readonly short_name: FieldRef<"Companyname", 'String'>
    readonly full_name: FieldRef<"Companyname", 'String'>
    readonly created_at: FieldRef<"Companyname", 'DateTime'>
    readonly updated_at: FieldRef<"Companyname", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Companyname findUnique
   */
  export type CompanynameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * Filter, which Companyname to fetch.
     */
    where: CompanynameWhereUniqueInput
  }

  /**
   * Companyname findUniqueOrThrow
   */
  export type CompanynameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * Filter, which Companyname to fetch.
     */
    where: CompanynameWhereUniqueInput
  }

  /**
   * Companyname findFirst
   */
  export type CompanynameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * Filter, which Companyname to fetch.
     */
    where?: CompanynameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companynames to fetch.
     */
    orderBy?: CompanynameOrderByWithRelationInput | CompanynameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companynames.
     */
    cursor?: CompanynameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companynames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companynames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companynames.
     */
    distinct?: CompanynameScalarFieldEnum | CompanynameScalarFieldEnum[]
  }

  /**
   * Companyname findFirstOrThrow
   */
  export type CompanynameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * Filter, which Companyname to fetch.
     */
    where?: CompanynameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companynames to fetch.
     */
    orderBy?: CompanynameOrderByWithRelationInput | CompanynameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companynames.
     */
    cursor?: CompanynameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companynames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companynames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companynames.
     */
    distinct?: CompanynameScalarFieldEnum | CompanynameScalarFieldEnum[]
  }

  /**
   * Companyname findMany
   */
  export type CompanynameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * Filter, which Companynames to fetch.
     */
    where?: CompanynameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companynames to fetch.
     */
    orderBy?: CompanynameOrderByWithRelationInput | CompanynameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companynames.
     */
    cursor?: CompanynameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companynames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companynames.
     */
    skip?: number
    distinct?: CompanynameScalarFieldEnum | CompanynameScalarFieldEnum[]
  }

  /**
   * Companyname create
   */
  export type CompanynameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * The data needed to create a Companyname.
     */
    data: XOR<CompanynameCreateInput, CompanynameUncheckedCreateInput>
  }

  /**
   * Companyname createMany
   */
  export type CompanynameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companynames.
     */
    data: CompanynameCreateManyInput | CompanynameCreateManyInput[]
  }

  /**
   * Companyname createManyAndReturn
   */
  export type CompanynameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Companynames.
     */
    data: CompanynameCreateManyInput | CompanynameCreateManyInput[]
  }

  /**
   * Companyname update
   */
  export type CompanynameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * The data needed to update a Companyname.
     */
    data: XOR<CompanynameUpdateInput, CompanynameUncheckedUpdateInput>
    /**
     * Choose, which Companyname to update.
     */
    where: CompanynameWhereUniqueInput
  }

  /**
   * Companyname updateMany
   */
  export type CompanynameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companynames.
     */
    data: XOR<CompanynameUpdateManyMutationInput, CompanynameUncheckedUpdateManyInput>
    /**
     * Filter which Companynames to update
     */
    where?: CompanynameWhereInput
  }

  /**
   * Companyname upsert
   */
  export type CompanynameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * The filter to search for the Companyname to update in case it exists.
     */
    where: CompanynameWhereUniqueInput
    /**
     * In case the Companyname found by the `where` argument doesn't exist, create a new Companyname with this data.
     */
    create: XOR<CompanynameCreateInput, CompanynameUncheckedCreateInput>
    /**
     * In case the Companyname was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanynameUpdateInput, CompanynameUncheckedUpdateInput>
  }

  /**
   * Companyname delete
   */
  export type CompanynameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
    /**
     * Filter which Companyname to delete.
     */
    where: CompanynameWhereUniqueInput
  }

  /**
   * Companyname deleteMany
   */
  export type CompanynameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companynames to delete
     */
    where?: CompanynameWhereInput
  }

  /**
   * Companyname without action
   */
  export type CompanynameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companyname
     */
    select?: CompanynameSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PayListScalarFieldEnum: {
    unique_id: 'unique_id',
    doc_no: 'doc_no',
    trans_type: 'trans_type',
    due_date: 'due_date',
    recipient: 'recipient',
    amount: 'amount',
    upload_at: 'upload_at'
  };

  export type PayListScalarFieldEnum = (typeof PayListScalarFieldEnum)[keyof typeof PayListScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    status: 'status'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const CompanynameScalarFieldEnum: {
    id: 'id',
    short_name: 'short_name',
    full_name: 'full_name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CompanynameScalarFieldEnum = (typeof CompanynameScalarFieldEnum)[keyof typeof CompanynameScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PayListWhereInput = {
    AND?: PayListWhereInput | PayListWhereInput[]
    OR?: PayListWhereInput[]
    NOT?: PayListWhereInput | PayListWhereInput[]
    unique_id?: StringFilter<"PayList"> | string
    doc_no?: StringNullableFilter<"PayList"> | string | null
    trans_type?: StringNullableFilter<"PayList"> | string | null
    due_date?: StringNullableFilter<"PayList"> | string | null
    recipient?: StringNullableFilter<"PayList"> | string | null
    amount?: StringNullableFilter<"PayList"> | string | null
    upload_at?: DateTimeFilter<"PayList"> | Date | string
  }

  export type PayListOrderByWithRelationInput = {
    unique_id?: SortOrder
    doc_no?: SortOrderInput | SortOrder
    trans_type?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    recipient?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    upload_at?: SortOrder
  }

  export type PayListWhereUniqueInput = Prisma.AtLeast<{
    unique_id?: string
    AND?: PayListWhereInput | PayListWhereInput[]
    OR?: PayListWhereInput[]
    NOT?: PayListWhereInput | PayListWhereInput[]
    doc_no?: StringNullableFilter<"PayList"> | string | null
    trans_type?: StringNullableFilter<"PayList"> | string | null
    due_date?: StringNullableFilter<"PayList"> | string | null
    recipient?: StringNullableFilter<"PayList"> | string | null
    amount?: StringNullableFilter<"PayList"> | string | null
    upload_at?: DateTimeFilter<"PayList"> | Date | string
  }, "unique_id">

  export type PayListOrderByWithAggregationInput = {
    unique_id?: SortOrder
    doc_no?: SortOrderInput | SortOrder
    trans_type?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    recipient?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    upload_at?: SortOrder
    _count?: PayListCountOrderByAggregateInput
    _max?: PayListMaxOrderByAggregateInput
    _min?: PayListMinOrderByAggregateInput
  }

  export type PayListScalarWhereWithAggregatesInput = {
    AND?: PayListScalarWhereWithAggregatesInput | PayListScalarWhereWithAggregatesInput[]
    OR?: PayListScalarWhereWithAggregatesInput[]
    NOT?: PayListScalarWhereWithAggregatesInput | PayListScalarWhereWithAggregatesInput[]
    unique_id?: StringWithAggregatesFilter<"PayList"> | string
    doc_no?: StringNullableWithAggregatesFilter<"PayList"> | string | null
    trans_type?: StringNullableWithAggregatesFilter<"PayList"> | string | null
    due_date?: StringNullableWithAggregatesFilter<"PayList"> | string | null
    recipient?: StringNullableWithAggregatesFilter<"PayList"> | string | null
    amount?: StringNullableWithAggregatesFilter<"PayList"> | string | null
    upload_at?: DateTimeWithAggregatesFilter<"PayList"> | Date | string
  }

  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: StringFilter<"Users"> | string
    name?: StringFilter<"Users"> | string
    role?: StringNullableFilter<"Users"> | string | null
    status?: StringNullableFilter<"Users"> | string | null
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    name?: StringFilter<"Users"> | string
    role?: StringNullableFilter<"Users"> | string | null
    status?: StringNullableFilter<"Users"> | string | null
  }, "id">

  export type UsersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: UsersCountOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Users"> | string
    name?: StringWithAggregatesFilter<"Users"> | string
    role?: StringNullableWithAggregatesFilter<"Users"> | string | null
    status?: StringNullableWithAggregatesFilter<"Users"> | string | null
  }

  export type CompanynameWhereInput = {
    AND?: CompanynameWhereInput | CompanynameWhereInput[]
    OR?: CompanynameWhereInput[]
    NOT?: CompanynameWhereInput | CompanynameWhereInput[]
    id?: IntFilter<"Companyname"> | number
    short_name?: StringFilter<"Companyname"> | string
    full_name?: StringFilter<"Companyname"> | string
    created_at?: DateTimeFilter<"Companyname"> | Date | string
    updated_at?: DateTimeFilter<"Companyname"> | Date | string
  }

  export type CompanynameOrderByWithRelationInput = {
    id?: SortOrder
    short_name?: SortOrder
    full_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CompanynameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    short_name?: string
    AND?: CompanynameWhereInput | CompanynameWhereInput[]
    OR?: CompanynameWhereInput[]
    NOT?: CompanynameWhereInput | CompanynameWhereInput[]
    full_name?: StringFilter<"Companyname"> | string
    created_at?: DateTimeFilter<"Companyname"> | Date | string
    updated_at?: DateTimeFilter<"Companyname"> | Date | string
  }, "id" | "short_name">

  export type CompanynameOrderByWithAggregationInput = {
    id?: SortOrder
    short_name?: SortOrder
    full_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: CompanynameCountOrderByAggregateInput
    _avg?: CompanynameAvgOrderByAggregateInput
    _max?: CompanynameMaxOrderByAggregateInput
    _min?: CompanynameMinOrderByAggregateInput
    _sum?: CompanynameSumOrderByAggregateInput
  }

  export type CompanynameScalarWhereWithAggregatesInput = {
    AND?: CompanynameScalarWhereWithAggregatesInput | CompanynameScalarWhereWithAggregatesInput[]
    OR?: CompanynameScalarWhereWithAggregatesInput[]
    NOT?: CompanynameScalarWhereWithAggregatesInput | CompanynameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Companyname"> | number
    short_name?: StringWithAggregatesFilter<"Companyname"> | string
    full_name?: StringWithAggregatesFilter<"Companyname"> | string
    created_at?: DateTimeWithAggregatesFilter<"Companyname"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Companyname"> | Date | string
  }

  export type PayListCreateInput = {
    unique_id?: string
    doc_no?: string | null
    trans_type?: string | null
    due_date?: string | null
    recipient?: string | null
    amount?: string | null
    upload_at?: Date | string
  }

  export type PayListUncheckedCreateInput = {
    unique_id?: string
    doc_no?: string | null
    trans_type?: string | null
    due_date?: string | null
    recipient?: string | null
    amount?: string | null
    upload_at?: Date | string
  }

  export type PayListUpdateInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    doc_no?: NullableStringFieldUpdateOperationsInput | string | null
    trans_type?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableStringFieldUpdateOperationsInput | string | null
    recipient?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    upload_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayListUncheckedUpdateInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    doc_no?: NullableStringFieldUpdateOperationsInput | string | null
    trans_type?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableStringFieldUpdateOperationsInput | string | null
    recipient?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    upload_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayListCreateManyInput = {
    unique_id?: string
    doc_no?: string | null
    trans_type?: string | null
    due_date?: string | null
    recipient?: string | null
    amount?: string | null
    upload_at?: Date | string
  }

  export type PayListUpdateManyMutationInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    doc_no?: NullableStringFieldUpdateOperationsInput | string | null
    trans_type?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableStringFieldUpdateOperationsInput | string | null
    recipient?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    upload_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayListUncheckedUpdateManyInput = {
    unique_id?: StringFieldUpdateOperationsInput | string
    doc_no?: NullableStringFieldUpdateOperationsInput | string | null
    trans_type?: NullableStringFieldUpdateOperationsInput | string | null
    due_date?: NullableStringFieldUpdateOperationsInput | string | null
    recipient?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableStringFieldUpdateOperationsInput | string | null
    upload_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersCreateInput = {
    id?: string
    name: string
    role?: string | null
    status?: string | null
  }

  export type UsersUncheckedCreateInput = {
    id?: string
    name: string
    role?: string | null
    status?: string | null
  }

  export type UsersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsersCreateManyInput = {
    id?: string
    name: string
    role?: string | null
    status?: string | null
  }

  export type UsersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UsersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanynameCreateInput = {
    short_name: string
    full_name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CompanynameUncheckedCreateInput = {
    id?: number
    short_name: string
    full_name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CompanynameUpdateInput = {
    short_name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanynameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    short_name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanynameCreateManyInput = {
    id?: number
    short_name: string
    full_name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type CompanynameUpdateManyMutationInput = {
    short_name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanynameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    short_name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PayListCountOrderByAggregateInput = {
    unique_id?: SortOrder
    doc_no?: SortOrder
    trans_type?: SortOrder
    due_date?: SortOrder
    recipient?: SortOrder
    amount?: SortOrder
    upload_at?: SortOrder
  }

  export type PayListMaxOrderByAggregateInput = {
    unique_id?: SortOrder
    doc_no?: SortOrder
    trans_type?: SortOrder
    due_date?: SortOrder
    recipient?: SortOrder
    amount?: SortOrder
    upload_at?: SortOrder
  }

  export type PayListMinOrderByAggregateInput = {
    unique_id?: SortOrder
    doc_no?: SortOrder
    trans_type?: SortOrder
    due_date?: SortOrder
    recipient?: SortOrder
    amount?: SortOrder
    upload_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UsersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    status?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    status?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    status?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CompanynameCountOrderByAggregateInput = {
    id?: SortOrder
    short_name?: SortOrder
    full_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CompanynameAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanynameMaxOrderByAggregateInput = {
    id?: SortOrder
    short_name?: SortOrder
    full_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CompanynameMinOrderByAggregateInput = {
    id?: SortOrder
    short_name?: SortOrder
    full_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CompanynameSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PayListDefaultArgs instead
     */
    export type PayListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PayListDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsersDefaultArgs instead
     */
    export type UsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsersDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanynameDefaultArgs instead
     */
    export type CompanynameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanynameDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}