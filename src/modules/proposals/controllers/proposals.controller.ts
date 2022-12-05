import { Body, Controller, Inject, Post, UploadedFile } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IProposalsService } from 'src/modules/proposals/interfaces/IProposalsService';
import { CreateProposalDto } from 'src/modules/proposals/dtos/createProposal.dto';
import { ApiFile } from 'src/utils/decorators/fileUpload';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ParseFile } from 'src/utils/customValidator/parsePipe';

@Controller(Routes.PROPOSAL)
export class ProposalsController {
  constructor(@Inject(Services.PROPOSAL) private proposalService: IProposalsService) {}
  @ApiBody({ type: CreateProposalDto })
  @ApiResponse({ status: 201, description: 'Proposal created' })
  @Post(Routes.CREATE_PROPOSAL)
  @ApiFile('file')
  createProposal(
    @Body() dto: CreateProposalDto,
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ) {
    return this.proposalService.createProposalFreelancer(dto, file);
  }
}
