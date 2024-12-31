/**
 * Converts a binary string to a Base62 encoded string.
 * Base62 characters: A-Z, a-z, 0-9
 *
 * @param binaryStr - The binary string to convert (e.g., "101011")
 * @returns The Base62 encoded string.
 */
function binaryToBase62(binaryStr: string): string {
  if (!/^[01]+$/.test(binaryStr)) {
    throw new Error("Input must be a binary string (only 0s and 1s).");
  }

  // Define the Base62 character set
  const base62Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const base62Radix = 62;

  // Convert binary string to decimal number
  const decimalValue = BigInt("0b" + binaryStr);

  // Convert decimal number to Base62
  let base62Str = "";
  let value = decimalValue;

  while (value > 0) {
    const remainder = Number(value % BigInt(base62Radix));
    base62Str = base62Chars[remainder] + base62Str;
    value = value / BigInt(base62Radix);
  }

  // Return the Base62 string ("0" for input "0")
  return base62Str || "0";
}

// Example usage
const binaryStr = "101011";
const base62Str = binaryToBase62(binaryStr);
console.log(base62Str);
