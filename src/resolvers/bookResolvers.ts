import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateBookInput } from "../Inputs/createBookInput";
import { Book } from "../models/Book";

@Resolver()
export class BookResolver {

  @Query(() => [Book])
  books() {
    return Book.find()
  }

  @Query(() => Book)
  async book(@Arg("id") id: string) {
    const book = await Book.findOne({ where: { id }})
    if (book) {
      return book
    }
    return null
  }

  @Mutation(() => Book)
  async createBook(@Arg("data") data: CreateBookInput) {
    const book = Book.create(data);
    await book.save();
    return book;
  }

  @Mutation(() => Book)
  async updateBook(@Arg("id") id: string, @Arg("data") data: CreateBookInput) {
    let book = await Book.findOne({ where: { id }})
    if (!book) throw new Error("Book not found")
    Object.assign(book, data)
    await book.save()
    return book
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("id") id: string) {
  const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error("Book not found!");
    await book.remove();
    return true;
  }
}