import { User, Invitation } from 'src/database/entities';
import { InvitationDto } from 'src/modules/invitation/dtos/invitation.dto';

export interface IInvitationService {
  sendInvitation(user: User, invitationDto: InvitationDto): Promise<Invitation>;
}
