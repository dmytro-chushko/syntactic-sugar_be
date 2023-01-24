import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Offer } from 'src/database/entities/offers.entity';
import { ActivatedGuard } from 'src/modules/auth/guards/activated.guard';
import { AuthJwtGuard } from 'src/modules/auth/guards/authJwt.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Routes, Services, UserRoles } from 'src/utils/constants';
import { Roles } from 'src/utils/decorators/roles';
import { CreateOfferDto } from 'src/modules/offer/dto/createOffer.dto';
import { IOfferService } from 'src/modules/offer/interfaces/IOfferService';
import { UpdateOfferDto } from 'src/modules/offer/dto/updateOffer.dto';

@Controller('offer')
export class OfferController {
  constructor(@Inject(Services.OFFER) private offerService: IOfferService) {}

  @ApiBody({ type: CreateOfferDto })
  @ApiResponse({ status: 201, description: 'Offer created' })
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.EMPLOYER)
  @UsePipes(ValidationPipe)
  @Post(Routes.CREATE_OFFER)
  createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offerService.createOffer(createOfferDto);
  }

  @ApiBody({ type: UpdateOfferDto })
  @ApiResponse({ status: 201, description: 'Offer updated' })
  @UseGuards(AuthJwtGuard, ActivatedGuard, RolesGuard)
  @Roles(UserRoles.FREELANCER)
  @UsePipes(ValidationPipe)
  @Post(Routes.UPDATE_OFFER)
  updateOffer(@Body() updateOfferDto: UpdateOfferDto): Promise<void> {
    return this.offerService.updateOffer(updateOfferDto);
  }
}
