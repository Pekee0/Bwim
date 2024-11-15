export interface Character {
    id?: string,
    name: string,
    nickname: string,
    description: string,
    birthDate?: string,
    deathDate?: string,
    projectName: (string | null)[],
    birthPlace?: string,
    images: (string | null)[]
}