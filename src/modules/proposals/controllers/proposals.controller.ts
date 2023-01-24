import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { IProposalsService } from 'src/modules/proposals/interfaces/IProposalsService';
import { CreateProposalDto } from 'src/modules/proposals/dtos/createProposal.dto';
import { ApiFile } from 'src/utils/decorators/fileUpload';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseFile } from 'src/utils/customValidator/parsePipe';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/roles';
import { Auth } from 'src/utils/decorators/auth';
import { Proposal, User } from 'src/database/entities';

@ApiTags('proposal')
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

  @ApiQuery({ name: 'id' })
  @ApiResponse({ status: 200, description: 'All proposals by job id' })
  @Get(Routes.GET_PROPOSALS_BY_JOB_ID)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  getProposalsByJobId(@Auth() user: User, @Param('id') id: string): Promise<Proposal[]> {
    return this.proposalService.getProposalsByJobId(user, id);
  }

  @ApiQuery({ name: 'id' })
  @ApiResponse({ status: 200, description: 'All proposals by job id' })
  @Get(Routes.GET_PROPOSAL_BY_ID)
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  getProposalsById(@Auth() user: User, @Param('id') id: string): Promise<Proposal> {
    return this.proposalService.getProposalById(user, id);
  }
}
