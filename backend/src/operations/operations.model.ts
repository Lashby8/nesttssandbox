import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum OperationsStatus {
  PENDING = 'In Progress',
  DONE = 'done',
  FAILED = 'failed',
}

@Entity()
export class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: OperationsStatus,
    default: OperationsStatus.PENDING,
  })
  status: string;
}
