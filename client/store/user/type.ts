// ______________________________________________________
//
export interface S {
  isAuthenticatedFlg: boolean
  uid: string
  providerData: firebase.UserInfo[]
  filterOption: {
    difficultyLevel: string[]
    genre: string[]
    version: string[]
    level: number[]
    type: string[]
    showColumn: string[]
  }
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
  setFilterOption: {
    difficultyLevel: string[]
    genre: string[]
    level: number[]
    type: string[]
  }
}
export interface RM {
  'user/isAuthenticatedFlgChange': M['isAuthenticatedFlgChange']
  'user/setUID': M['setUID']
  'user/setFilterOption': M['setFilterOption']
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
