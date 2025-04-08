// src/data/implementations/stringImplementations.js

export const stringImplementations = {
  javascript: `// Common String Operations in JavaScript

// 1. String Creation
let str1 = "Hello, World!";  // Using double quotes
let str2 = 'Hello, World!';  // Using single quotes
let str3 = \`Hello, World!\`;  // Using template literals

// 2. String Length
const length = str1.length;  // 13

// 3. Accessing Characters
const firstChar = str1[0];  // 'H'
const lastChar = str1[str1.length - 1];  // '!'
const charAtIndex = str1.charAt(3);  // 'l'

// 4. String Concatenation
const greeting = "Hello";
const name = "Alice";
// Using + operator
const message1 = greeting + ", " + name + "!";  // "Hello, Alice!"
// Using template literals
const message2 = \`\${greeting}, \${name}!\`;  // "Hello, Alice!"
// Using concat method
const message3 = greeting.concat(", ", name, "!");  // "Hello, Alice!"

// 5. Substring Extraction
const text = "JavaScript is awesome";
// substring(startIndex, endIndex) - endIndex not included
const sub1 = text.substring(0, 10);  // "JavaScript"
// substr(startIndex, length)
const sub2 = text.substr(11, 2);  // "is"
// slice(startIndex, endIndex) - can use negative indices
const sub3 = text.slice(-7);  // "awesome"

// 6. String Search
const sentence = "The quick brown fox jumps over the lazy dog";
// indexOf - returns first occurrence or -1 if not found
const indexOfFox = sentence.indexOf("fox");  // 16
// lastIndexOf - returns last occurrence or -1 if not found
const lastIndexOfThe = sentence.lastIndexOf("the");  // 31
// includes - returns boolean
const hasDog = sentence.includes("dog");  // true
// startsWith/endsWith - returns boolean
const startsWithThe = sentence.startsWith("The");  // true
const endsWithDog = sentence.endsWith("dog");  // true

// 7. String Replacement
const original = "Hello, World!";
// replace - replaces first occurrence
const replaced = original.replace("World", "JavaScript");  // "Hello, JavaScript!"
// replaceAll - replaces all occurrences
const text2 = "apple apple apple";
const replacedAll = text2.replaceAll("apple", "orange");  // "orange orange orange"

// 8. Case Conversion
const mixedCase = "Hello, World!";
const lowerCase = mixedCase.toLowerCase();  // "hello, world!"
const upperCase = mixedCase.toUpperCase();  // "HELLO, WORLD!"

// 9. Trimming
const paddedText = "   Hello, World!   ";
const trimmed = paddedText.trim();  // "Hello, World!"
const trimmedStart = paddedText.trimStart();  // "Hello, World!   "
const trimmedEnd = paddedText.trimEnd();  // "   Hello, World!"

// 10. Splitting and Joining
const csvData = "apple,orange,banana,grape";
const fruits = csvData.split(",");  // ["apple", "orange", "banana", "grape"]
const joinedBack = fruits.join(", ");  // "apple, orange, banana, grape"

// 11. String Comparison
const str4 = "apple";
const str5 = "banana";
const isEqual = str4 === str5;  // false
const comparison = str4.localeCompare(str5);  // -1 (str4 comes before str5)

// 12. String Padding
const num = "42";
const paddedStart = num.padStart(5, "0");  // "00042"
const paddedEnd = num.padEnd(5, "*");  // "42***"

// 13. String Repeat
const repeated = "abc".repeat(3);  // "abcabcabc"

// 14. Regular Expression Operations
const text3 = "The year is 2023, and the code is ABC-123";
// match - returns array of matches
const years = text3.match(/\\d{4}/);  // ["2023"]
// search - returns index of first match or -1
const codeIndex = text3.search(/[A-Z]+-\\d{3}/);  // 27
// replace with regex
const noDigits = text3.replace(/\\d+/g, "XXXX");  // "The year is XXXX, and the code is ABC-XXXX"

// 15. Character Code Conversion
const charCode = "A".charCodeAt(0);  // 65
const fromCharCode = String.fromCharCode(65);  // "A"`,

  python: `# Common String Operations in Python

# 1. String Creation
str1 = "Hello, World!"  # Using double quotes
str2 = 'Hello, World!'  # Using single quotes
str3 = """Hello, 
World!"""  # Using triple quotes for multiline strings

# 2. String Length
length = len(str1)  # 13

# 3. Accessing Characters
first_char = str1[0]  # 'H'
last_char = str1[-1]  # '!'
# Slicing
substring = str1[0:5]  # "Hello"

# 4. String Concatenation
greeting = "Hello"
name = "Alice"
# Using + operator
message1 = greeting + ", " + name + "!"  # "Hello, Alice!"
# Using format method
message2 = "{}, {}!".format(greeting, name)  # "Hello, Alice!"
# Using f-strings (Python 3.6+)
message3 = f"{greeting}, {name}!"  # "Hello, Alice!"
# Using join
message4 = ", ".join([greeting, name + "!"])  # "Hello, Alice!"

# 5. String Methods for Substrings
text = "Python is awesome"
# Find a substring
index = text.find("is")  # 7
# Count occurrences
count = text.count("o")  # 2
# Check if string starts or ends with a substring
starts_with = text.startswith("Python")  # True
ends_with = text.endswith("awesome")  # True
# Check if substring exists
contains = "awesome" in text  # True

# 6. String Replacement
original = "Hello, World!"
replaced = original.replace("World", "Python")  # "Hello, Python!"
# Replace with count
text2 = "apple apple apple"
replaced_count = text2.replace("apple", "orange", 2)  # "orange orange apple"

# 7. Case Conversion
mixed_case = "Hello, World!"
lower_case = mixed_case.lower()  # "hello, world!"
upper_case = mixed_case.upper()  # "HELLO, WORLD!"
title_case = "hello world".title()  # "Hello World"
swapped_case = mixed_case.swapcase()  # "hELLO, wORLD!"

# 8. Stripping Whitespace
padded_text = "   Hello, World!   "
stripped = padded_text.strip()  # "Hello, World!"
left_stripped = padded_text.lstrip()  # "Hello, World!   "
right_stripped = padded_text.rstrip()  # "   Hello, World!"
# Strip specific characters
custom_stripped = "###Hello, World!###".strip("#")  # "Hello, World!"

# 9. Splitting and Joining
csv_data = "apple,orange,banana,grape"
fruits = csv_data.split(",")  # ["apple", "orange", "banana", "grape"]
joined_back = ", ".join(fruits)  # "apple, orange, banana, grape"
# Split with maxsplit
limited_split = "a,b,c,d,e".split(",", 2)  # ["a", "b", "c,d,e"]

# 10. String Checking
numeric = "12345".isdigit()  # True
alphabetic = "Hello".isalpha()  # True
alphanumeric = "Hello123".isalnum()  # True
lowercase = "hello".islower()  # True
uppercase = "HELLO".isupper()  # True
whitespace = "   ".isspace()  # True

# 11. String Alignment and Padding
text3 = "Python"
centered = text3.center(20, "*")  # "*******Python*******"
left_aligned = text3.ljust(20, "-")  # "Python--------------"
right_aligned = text3.rjust(20, "-")  # "--------------Python"
zero_padded = "42".zfill(5)  # "00042"

# 12. String Translation
translation_table = str.maketrans("aeiou", "12345")
translated = "hello".translate(translation_table)  # "h2ll4"

# 13. String Encoding/Decoding
encoded = "Hello".encode("utf-8")  # b'Hello'
decoded = encoded.decode("utf-8")  # "Hello"

# 14. String Formatting
# Old style
old_format = "Name: %s, Age: %d" % ("Alice", 30)  # "Name: Alice, Age: 30"
# Format method
new_format = "Name: {}, Age: {}".format("Bob", 25)  # "Name: Bob, Age: 25"
# Named placeholders
named_format = "Name: {name}, Age: {age}".format(name="Charlie", age=35)  # "Name: Charlie, Age: 35"
# F-strings (Python 3.6+)
name, age = "David", 40
f_string = f"Name: {name}, Age: {age}"  # "Name: David, Age: 40"

# 15. Raw Strings
raw_string = r"C:\\Users\\Username"  # Backslashes are not treated as escape characters`
};
