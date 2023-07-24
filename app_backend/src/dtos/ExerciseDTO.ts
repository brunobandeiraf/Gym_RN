// Type de exercícios que o backend irá retornar
export type ExerciseDTO = {
    id: string;
    demo: string;//foto
    group: string;
    name: string;
    repetitions: string;
    series: number;
    thumb: string;
    updated_at: string;
  }