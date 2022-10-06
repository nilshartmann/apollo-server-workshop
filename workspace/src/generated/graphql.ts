import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCommentFailedPayload = {
  __typename?: "AddCommentFailedPayload";
  errorMsg: Scalars["String"];
};

export type AddCommentInput = {
  content: Scalars["String"];
  storyId: Scalars["ID"];
};

export type AddCommentPayload =
  | AddCommentFailedPayload
  | AddCommentSuccessPayload;

export type AddCommentSuccessPayload = {
  __typename?: "AddCommentSuccessPayload";
  newComment: Comment;
};

export type Comment = {
  __typename?: "Comment";
  content: Scalars["String"];
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  story: Story;
  writtenBy: Member;
};

export type Member = {
  __typename?: "Member";
  /** Short biography of a member. Optional. */
  bio?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  profileImage: Scalars["String"];
  stories: Array<Story>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  addComment: AddCommentPayload;
};

export type MutationAddCommentArgs = {
  input: AddCommentInput;
};

export type OnNewCommentEvent = {
  __typename?: "OnNewCommentEvent";
  newComment: Comment;
};

export type PageResult = {
  __typename?: "PageResult";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  pageNumber: Scalars["Int"];
  totalCount: Scalars["Int"];
  totalPageCount: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  comments: Array<Comment>;
  /**
   * Return the current logged in Member (as read from the `Authorization` JWT) or null
   * if no member is logged in
   */
  me?: Maybe<Member>;
  /**
   * Returns the requested amount of stories, ordered by date, so
   * that newest/latest stories come first
   */
  stories: StoryConnection;
  /** Returns the newest `Story` in our backend or null if no Story available */
  story?: Maybe<Story>;
};

export type QueryCommentsArgs = {
  storyId: Scalars["ID"];
};

export type QueryStoriesArgs = {
  page?: Scalars["Int"];
  pageSize?: Scalars["Int"];
};

export type QueryStoryArgs = {
  storyId?: InputMaybe<Scalars["ID"]>;
};

/** This is a `Story`. */
export type Story = {
  __typename?: "Story";
  body: Scalars["String"];
  comments: Array<Comment>;
  createdAt: Scalars["String"];
  excerpt: Scalars["String"];
  id: Scalars["ID"];
  title: Scalars["String"];
  writtenBy: Member;
};

/** This is a `Story`. */
export type StoryExcerptArgs = {
  maxLength?: Scalars["Int"];
};

/**
 * A **StoryConnection** represents a connection in our graph from one
 * node to a list of `Story` nodes: `Query --> StoryConnection --> Store`
 */
export type StoryConnection = {
  __typename?: "StoryConnection";
  page: PageResult;
  stories: Array<Story>;
};

export type Subscription = {
  __typename?: "Subscription";
  onNewComment: OnNewCommentEvent;
};

export type SubscriptionOnNewCommentArgs = {
  storyId: Scalars["ID"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCommentFailedPayload: ResolverTypeWrapper<
    Partial<AddCommentFailedPayload>
  >;
  AddCommentInput: ResolverTypeWrapper<Partial<AddCommentInput>>;
  AddCommentPayload: Partial<
    | ResolversTypes["AddCommentFailedPayload"]
    | ResolversTypes["AddCommentSuccessPayload"]
  >;
  AddCommentSuccessPayload: ResolverTypeWrapper<
    Partial<AddCommentSuccessPayload>
  >;
  Boolean: ResolverTypeWrapper<Partial<Scalars["Boolean"]>>;
  Comment: ResolverTypeWrapper<Partial<Comment>>;
  ID: ResolverTypeWrapper<Partial<Scalars["ID"]>>;
  Int: ResolverTypeWrapper<Partial<Scalars["Int"]>>;
  Member: ResolverTypeWrapper<Partial<Member>>;
  Mutation: ResolverTypeWrapper<{}>;
  OnNewCommentEvent: ResolverTypeWrapper<Partial<OnNewCommentEvent>>;
  PageResult: ResolverTypeWrapper<Partial<PageResult>>;
  Query: ResolverTypeWrapper<{}>;
  Story: ResolverTypeWrapper<Partial<Story>>;
  StoryConnection: ResolverTypeWrapper<Partial<StoryConnection>>;
  String: ResolverTypeWrapper<Partial<Scalars["String"]>>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<Partial<User>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCommentFailedPayload: Partial<AddCommentFailedPayload>;
  AddCommentInput: Partial<AddCommentInput>;
  AddCommentPayload: Partial<
    | ResolversParentTypes["AddCommentFailedPayload"]
    | ResolversParentTypes["AddCommentSuccessPayload"]
  >;
  AddCommentSuccessPayload: Partial<AddCommentSuccessPayload>;
  Boolean: Partial<Scalars["Boolean"]>;
  Comment: Partial<Comment>;
  ID: Partial<Scalars["ID"]>;
  Int: Partial<Scalars["Int"]>;
  Member: Partial<Member>;
  Mutation: {};
  OnNewCommentEvent: Partial<OnNewCommentEvent>;
  PageResult: Partial<PageResult>;
  Query: {};
  Story: Partial<Story>;
  StoryConnection: Partial<StoryConnection>;
  String: Partial<Scalars["String"]>;
  Subscription: {};
  User: Partial<User>;
};

export type AddCommentFailedPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AddCommentFailedPayload"] = ResolversParentTypes["AddCommentFailedPayload"]
> = {
  errorMsg?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddCommentPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AddCommentPayload"] = ResolversParentTypes["AddCommentPayload"]
> = {
  __resolveType: TypeResolveFn<
    "AddCommentFailedPayload" | "AddCommentSuccessPayload",
    ParentType,
    ContextType
  >;
};

export type AddCommentSuccessPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AddCommentSuccessPayload"] = ResolversParentTypes["AddCommentSuccessPayload"]
> = {
  newComment?: Resolver<ResolversTypes["Comment"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = {
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  story?: Resolver<ResolversTypes["Story"], ParentType, ContextType>;
  writtenBy?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Member"] = ResolversParentTypes["Member"]
> = {
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  profileImage?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  stories?: Resolver<Array<ResolversTypes["Story"]>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  addComment?: Resolver<
    ResolversTypes["AddCommentPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationAddCommentArgs, "input">
  >;
};

export type OnNewCommentEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["OnNewCommentEvent"] = ResolversParentTypes["OnNewCommentEvent"]
> = {
  newComment?: Resolver<ResolversTypes["Comment"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PageResult"] = ResolversParentTypes["PageResult"]
> = {
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  pageNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPageCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<QueryCommentsArgs, "storyId">
  >;
  me?: Resolver<Maybe<ResolversTypes["Member"]>, ParentType, ContextType>;
  stories?: Resolver<
    ResolversTypes["StoryConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryStoriesArgs, "page" | "pageSize">
  >;
  story?: Resolver<
    Maybe<ResolversTypes["Story"]>,
    ParentType,
    ContextType,
    Partial<QueryStoryArgs>
  >;
};

export type StoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Story"] = ResolversParentTypes["Story"]
> = {
  body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  comments?: Resolver<
    Array<ResolversTypes["Comment"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  excerpt?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<StoryExcerptArgs, "maxLength">
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  writtenBy?: Resolver<ResolversTypes["Member"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StoryConnection"] = ResolversParentTypes["StoryConnection"]
> = {
  page?: Resolver<ResolversTypes["PageResult"], ParentType, ContextType>;
  stories?: Resolver<Array<ResolversTypes["Story"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
  onNewComment?: SubscriptionResolver<
    ResolversTypes["OnNewCommentEvent"],
    "onNewComment",
    ParentType,
    ContextType,
    RequireFields<SubscriptionOnNewCommentArgs, "storyId">
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddCommentFailedPayload?: AddCommentFailedPayloadResolvers<ContextType>;
  AddCommentPayload?: AddCommentPayloadResolvers<ContextType>;
  AddCommentSuccessPayload?: AddCommentSuccessPayloadResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OnNewCommentEvent?: OnNewCommentEventResolvers<ContextType>;
  PageResult?: PageResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Story?: StoryResolvers<ContextType>;
  StoryConnection?: StoryConnectionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
