
export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export interface TokenPayload {
  id: string,
  name: string,
  role: USER_ROLES
}

export interface UserDB {
  _id?: string,
  name: string,
  email: string,
  password: string,
  role: USER_ROLES,  
  created_at: string,
  news_letter: string, 
  reset_password: string 
}
 
export interface AdminDB {
  role: USER_ROLES  
}
  
