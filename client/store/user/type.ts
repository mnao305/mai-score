// ______________________________________________________
//
export interface S {
  isAuthenticatedFlg: boolean
}
// ______________________________________________________
//
export interface G {
  //
}
export interface RG {
  //
}
// ______________________________________________________
//
export interface M {
  isAuthenticatedFlgChange: boolean
}
export interface RM {
  'user/isAuthenticatedFlgChange': M['isAuthenticatedFlgChange']
}
// ______________________________________________________
//
export interface A {
  login: any
  logout: any
}
export interface RA {
  'user/login': A['login']
  'user/logout': A['logout']
}
