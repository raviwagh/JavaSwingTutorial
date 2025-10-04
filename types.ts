
export interface Language {
  code: 'en' | 'mr' | 'hi';
  name: string;
}

export interface Chapter {
  title: string;
  content: Map<string, string>; // Map<languageCode, content>
}
