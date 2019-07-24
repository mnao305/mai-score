// ______________________________________________________
//
export interface S {
  isAuthenticatedFlg: boolean
  uid: string
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
  setUID: string
}
export interface RM {
  'user/isAuthenticatedFlgChange': M['isAuthenticatedFlgChange']
  'user/setUID': M['setUID']
}
// ______________________________________________________
//
export interface A {
  setUser: firebase.User
  logout: any
}
export interface RA {
  'user/setUser': A['setUser']
  'user/logout': A['logout']
}
