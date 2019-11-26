import { Controller, Get } from 'routing-controllers';

@Controller()
export default class MainController {
    @Get('/')
    getSession() {
        return 'Hello, World!';
    }
}
