import { InputType, Field } from "type-graphql";

@InputType()
export class CreateBookInput {
  @Field()
  title: string

  @Field()
  description: string

  @Field()
  author: string

  @Field({ nullable: true})
  isPublished?: boolean
}