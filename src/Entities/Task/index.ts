import { Model } from 'sequelize';
import { Field, ID, ObjectType } from 'type-graphql';
import type { ITask, ITaskCreationAttributes } from '#Entities/Task/types';

@ObjectType()
class Task extends Model<ITask, ITaskCreationAttributes> implements ITask {
  @Field(() => ID)
  public taskId!: string;

  @Field()
  public title!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field(() => ID)
  public userId!: string;

  @Field()
  public readonly createdAt!: Date;

  @Field()
  public readonly updatedAt!: Date;
}

export default Task;
