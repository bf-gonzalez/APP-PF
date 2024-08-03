import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './membership.dto';
import { MembershipsRepository } from './membership.repository';

@Injectable()
export class MembershipService {
  constructor(private readonly membershipsRepository: MembershipsRepository) {}

  addMembership(createMembership: CreateMembershipDto) {
    return this.membershipsRepository.addMembership(createMembership);
  }

  getMerberships() {
    return this.membershipsRepository.getMerberships();
  }
}
