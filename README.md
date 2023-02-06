# Credit Card System

## Overview

This is a monorepo repository which contains the source code for the Credit Card System - Job Assignment.

## Setup

### Prerequisites

* [Make](https://www.gnu.org/software/make/)
* [Docker](https://www.docker.com/)

Run the following command in the root of the project to install all dependencies:

```bash
make install
```

  
## Running the service

Run API service using command:

``` bash
make dev
```

## GUI Access

Once application is running type `http://localhost:3000` address in your browser to access React GUI

## Usage

### Add new Credit Card

Create POST request using `http://localhost:8080/api/v1/card/` as an endpoint with parameter specified below:
``` bash
{
    name: String, // required
    number: Number, // required
    limit: Number, // required
    currency: GBP|USD|etc // optional
}
```

In example:

``` bash
curl --location --request POST 'http://localhost:8080/api/v1/card' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "Daniel", "number": "1234567812345670", "limit": 5000}'
```

### Retriev all stored Credit Cards

Create GET request using `http://localhost:8080/api/v1/cards/` as an endpoint like in example below:


``` bash
curl --location --request GET 'http://localhost:8080/api/v1/cards'
```

## TODO

1. Add OpenAPI Spec to Documentation