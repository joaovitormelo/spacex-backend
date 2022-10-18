# SpaceX Backend

Backend para consumir a API SpaceX

## Setup

Para configurar o ambiente, são necessários dois passos:

- Execução do comando ```npm install```, para instalar todas as dependências.
- Criação do arquivo .env, configurando a variável de ambiente ```PORT``` com a porta desejada.

## Arquitetura

Para a realização deste projeto de backend, optei pelo uso de uma arquitetura inspirada pela Clean Architecture, que confere ao projeto escalabilidade, testabilidade e desacoplamento de suas partes umas das outras. O que motivou essa escolha foi a possibilidade de demonstrar boas práticas de arquitetura (e código), aplicáveis de forma ainda mais contundente para sistemas maiores e mais complexos do que a aplicação em questão. Um exemplo de uma dessa práticas é a Dependency Injection, consistindo na passagem de dependências através do método construtor das classes, permitindo maior desacoplamento entre eles. Essa prática é fundamental para o princípio de Inversão de Dependência, uma das bases do SOLID.

## Componentes

### Core
Na pasta [core](https://github.com/joaovitormelo/spacex-backend/tree/main/src/core), estão presentes algumas classes básicas, referentes a configurações, variáveis globais, erros, utilitários, entre outros. Em uma aplicação maior, essas classes seriam compartilhadas por todos os módulos/features.

### Usecases

Na pasta [usecases](https://github.com/joaovitormelo/spacex-backend/tree/main/src/features/launches/usecases) está encapsulada a lógica de negócio. É por onde a implementação do código começa, seguindo os princípios da Clean Architecture. No caso dessa aplicação, os usecase estão apenas retornando o valor devolvido pelo repository, já que não nenhuma lógica de negócio complexa envolvida.

Os usecase dependem de uma interface, ao invés de depender diretamente da classe de repository. Isso também faz parte da Clean Architecture, e tal procedimento permite o desacoplamento da lógica de negócios da classe que fornece os dados, que pode ser substituída por qualquer outra classe que implemente a mesma interface.

### Data

A pasta [data](https://github.com/joaovitormelo/spacex-backend/tree/main/src/features/launches/data) contém o repository, responsável por realizar o acesso à API (originária) da SpaceX e fornecer os dados à aplicação, e o LaunchModel, responsável por fazer uma abstração das propriedades que a entidade "Launch"/Lançamento possui, a fim de que se trabalhe com um modelo já conhecido dentro da aplicação, não somente com um objeto JS padrão. Os métodos presentes no model são responsáveis por realizar a conversão do JSON  para o model, e vice-versa.

```
import { Utils } from "../../../../core/utils/utils";

export class LaunchModel {
  flightNumber: number;
  name: string;
  date: string;

  constructor(flightNumber: number, name: string, date: string) {
    this.flightNumber = flightNumber;
    this.name = name;
    this.date = date;
  }

  static fromJson(json) {
    return new LaunchModel(
      json.flight_number,
      json.name,
      Utils.convertUtcDateToLocal(json.date_utc)
    );
  }

  toJson() {
    return {
      flight_number: this.flightNumber,
      name: this.name,
      date: this.date,
    };
  }
}
```
