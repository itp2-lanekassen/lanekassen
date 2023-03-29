export interface AzureAdUser {
  id: string;
  userPrincipalName: string;
  displayName: string;
  givenName: string;
  surname: string;
  mail: string;
  jobTitle?: string;
  mobilePhone?: number;
  officeLocation?: string;
  preferredLanguage?: string;
  department?: string;
  manager?: string;
}
