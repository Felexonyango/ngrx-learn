export interface IUserRole {
  _id?: string;
  role: string;
}

export enum RoleAction {
  ASSIGN = 'ASSIGN',
  UNASSIGN = 'UNASSIGN'
}
