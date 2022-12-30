import { Body, Controller, Inject, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { IProposalsService } from 'src/modules/proposals/interfaces/IProposalsService';
import { CreateProposalDto } from 'src/modules/proposals/dtos/createProposal.dto';
import { ApiFile } from 'src/utils/decorators/fileUpload';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ParseFile } from 'src/utils/customValidator/parsePipe';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/roles';
import { Auth } from 'src/utils/decorators/auth';
import { User } from 'index';

@Controller(Routes.PROPOSAL)
export class ProposalsController {
  constructor(@Inject(Services.PROPOSAL) private proposalService: IProposalsService) {}

  @ApiBody({ type: CreateProposalDto })
  @ApiResponse({ status: 201, description: 'Proposal created' })
  @Post(Routes.CREATE_PROPOSAL)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.FREELANCER)
  @ApiFile('file')
  createProposal(
    @Auth() user: User,
    @Body() dto: CreateProposalDto,
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ) {
    return this.proposalService.createProposalFreelancer(user, dto, file);
  }
}
