import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { IInvitationService } from 'src/modules/invitation/interfaces/IInvitationServce';
import { InvitationDto } from 'src/modules/invitation/dtos/invitation.dto';
import { User } from 'src/database/entities';
import { Auth } from 'src/utils/decorators/auth';
import { Roles } from 'src/utils/decorators/roles';
@ApiTags('invitation')
@Controller(Routes.INVITATION)
export class InvitationController {
  constructor(@Inject(Services.INVITATION) private invitationService: IInvitationService) {}

  @ApiBody({ type: InvitationDto })
  @ApiResponse({ status: 200, description: 'Invitation sent' })
  @Post(Routes.SEND)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  sendInvitation(@Auth() user: User, @Body() invitationDto: InvitationDto) {
    return this.invitationService.sendInvitation(user, invitationDto);
  }
}
