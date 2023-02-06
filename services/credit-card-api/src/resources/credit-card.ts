import crypto from "crypto";
import { luhn } from "@dp/luhn";

/**
 * XXX: TODO: Move types to centrilized files
 */
interface Currencies {
  [id: string]: object;
  GBP: { code: string; sign: string };
}

type Card = {
  name: string;
  number: number;
  limit: number;
  currency?: keyof Currencies;
};

/**
 * Class representing Credit Card Account
 */
class CreditCard {
  #currencies: Currencies = {
    GBP: {
      code: `GBP`,
      sign: `£`,
    },
  };

  #defaultCurrency = `GBP`;

  #_id: string;

  get id() {
    return this.#_id;
  }

  #_name: string;

  get name() {
    return this.#_name;
  }

  #_number: number;

  get number() {
    return this.#_number;
  }

  #numberMaxSize = 19;

  #_used = 0;
  #_active = false;

  #_limit: number;

  get limit() {
    return this.#_limit;
  }

  set limit(limit: number) {
    this.#_limit = limit;
  }

  #_currency: keyof Currencies;

  get currency() {
    return this.#currencies[this.#_currency];
  }

  /**
   * CreditCard constructor
   * @param {object} card - handling card data
   * @param {string} card.name - Name of the user
   * @param {number} card.number - Number of the card
   * @param {number} card.limit - Limit for the card
   * @param {string} card.currency - Currency of the card
   */
  constructor(card: Card) {
    this.#validate(card);

    const { name, number, limit, currency } = card;

    this.#_id = this.#generateId(number);

    this.#_name = name;
    this.#_number = number;
    this.#_limit = limit;

    this.#_currency = currency ?? this.#defaultCurrency;
  }

  /**
   * Private method for generating card ID from proviced card number
   * @param {number} number - Card number
   * @returns {string} id - generated card id
   */
  #generateId(number: number) {
    const part = String(number);
    const id = crypto.createHash("md5").update(part).digest("hex");

    return id;
  }

  /**
   * Private method for card data validation
   * @param {object} card - card data
   */
  #validate(card: Card): void {
    const {
      number,
      //name,
      //limit,
      //currency
    } = card;

    this.#validateNumber(number);
  }

  /**
   * Private method for validating card number
   * @param {number} number - number of card to validate
   */
  #validateNumber(number: number): void {
    const parsed = String(number);

    if (!parsed.length || parsed.length > this.#numberMaxSize) {
      throw new Error(`Provided Credit Card number length is incorrect.`);
    }

    if (!luhn(parsed)) {
      throw new Error(`Provided Credit Card number format is invalid.`);
    }
  }

  /**
   * Private method return current balance
   * @returns {number} current balance
   */
  #calcBalance(): number {
    let balance = 0;

    if (this.#_active) {
      balance = this.limit - this.#_used;
    }

    return balance;
  }

  /**
   * Public method for handling card data output
   * @returns {object} - Card data for store
   */
  json() {
    return {
      id: this.id,
      name: this.name,
      number: this.number,
      balance: this.#calcBalance(),
      limit: this.limit,
      currency: this.currency,
    };
  }
}

export { CreditCard, Card };
