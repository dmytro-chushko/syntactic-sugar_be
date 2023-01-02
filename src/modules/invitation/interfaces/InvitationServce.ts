import { User, Invitation } from 'src/database/entities';
import { InvitationDto } from 'src/modules/invitation/dtos/invitation.dto';

export interface InvitationService {
  sendInvitation(user: User, invitationDto: InvitationDto): Promise<Invitation>;
}
