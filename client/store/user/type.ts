// ______________________________________________________
//
export interface S {
  isAuthenticatedFlg: boolean
  uid: string
  providerData: firebase.UserInfo[]
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
  setProviderData: firebase.UserInfo[]
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
  saveTwitterToken: firebase.auth.OAuthCredential
}
export interface RA {
  'user/setUser': A['setUser']
  'user/logout': A['logout']
  'user/saveTwitterToken': A['saveTwitterToken']
}
