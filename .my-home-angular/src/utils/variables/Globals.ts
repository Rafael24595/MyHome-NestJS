import { User } from "src/classes/User";

export const service_config = {
    connection: {
        protocol: 'http',
        host: 'localhost',
        port: '3000'
    }
}

export let user_config: {user: User | undefined} = {
    user: undefined
};