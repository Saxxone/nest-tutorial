import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  create(body: CreateUserDto) {
    const user = this.usersRepository.create(body);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const result = await this.usersRepository.findOne(id);
    if (!result) throw new NotFoundException("User does not exist");
    else return result;
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User does not exist");
    } else {
      Object.assign(user, attrs);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw  new NotFoundException("User does not exist");
    } else {
      return this.usersRepository.remove(user);
    }
  }
}
