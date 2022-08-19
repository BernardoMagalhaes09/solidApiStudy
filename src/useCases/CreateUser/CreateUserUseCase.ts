import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        private usersRepository: IUsersRepository
    ) {}


    async execute(data: ICreateUserRequestDTO) {

        const userAlreadyExistis = await this.usersRepository.findByEmail(data.email)

        if(userAlreadyExistis) {
            throw new Error("User already exists")
        }

        const user = new User(data)

        await this.usersRepository.save(user)

    }
}