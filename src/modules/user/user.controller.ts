import { Controller } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('v1/user')
@Controller('user')
export class UserController {}
