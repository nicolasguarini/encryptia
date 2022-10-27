
<p align="center">
    <a href="https://encryptia.vercel.app/" target="_blank">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://github.com/nicolasguarini/encryptia/blob/main/.github/logo-dark.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://github.com/nicolasguarini/encryptia/blob/main/.github/logo-light.svg">
            <img src="https://github.com/nicolasguarini/encryptia/blob/main/.github/logo-dark.svg" alt="encryptia" width="275">
        </picture>
    </a>
</p>

<p align="center">
  Easily encrypt and decrypt your texts with a variety of known algorithms!<br> 
  You can use the REST API or the webapp!
<p>

<p align="center">
  <a href="https://ecnryptia.vercel.app"><strong>Let's encrypt! &rarr;</strong></a>
</p>


<p align="center">
    <img src="https://img.shields.io/github/license/nicolasguarini/encryptia" alt="Licence">
    <img src="https://img.shields.io/github/last-commit/nicolasguarini/encryptia" alt="Language">
    <img src="https://img.shields.io/github/package-json/v/nicolasguarini/encryptia" alt="Version">
</p>

## About the project
encryptia is a platform that allows you to encrypt your texts using various algorithms. \
This is a project designed both for cryptography enthusiasts who want to tinker with the various algorithm configurations via the web application, and for developers who need to encrypt data via the API.
### Built with
encryptia is a web application built with Next.js, and some other technologies:
- <a href="https://wikipedia.org/wiki/JavaScript">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</a>

- <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
</a>

- <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
</a>

- <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</a> 

-  <a href="https://eslint.org/">
    <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
</a>

- <a href="https://vercel.com/">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

- <a href="https://git-scm.com/">
    <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" />
</a>

- <a href="https://www.figma.com/">
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
</a>

- <a href="https://www.notion.so/">
    <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
</a>

### Algorithms
encryptia provides several of the best known algorithms, and is in continuous development to add new ones:

- DES
- Triple DES
- AES

## Getting Started
This project is built with Next.js, so you have to satisfy some system requirements:

- Node.js 14.6.0 or newer
- MacOS, Windows (including WSL), and Linux are supported

First, clone the repository or download the compressed folder: 
```
> git clone https://github.com/nicolasguarini/encryptia.git
```
Install the dependencies:
```
> cd encryptia
> npm install
```
Run the development server:
``` 
> npm run dev
# or
> yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

API routes can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/).

### Learn more
To learn more about Next.js, take a look at the following resources:
- [Next.js Documetation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## API Usage
The API endpoints can be accessed on `https://encryptia.vercel.app/api/[algorithmName]?[params]`. \
Every algorithm endpoint can take several params, here is a list:

- `plaintext` - the message to be encrypted
- `key` - the key with which to encrypt the text
- `mode` - the encrytion mode (for now, only available for DES algorithm)
    
    - `ECB` - Electronic Codebook (default)
    - `CBC` - Cipher Block Chaining
    - `CFB` - Cipher Feedback Block
    - `OFB` - Output Feedback Block
    - `CTR` - Counter Block
    
    Note: every mode, apart from ECB, also needs to receive the `iv` parameter

- `iv` - the initialization vector
- `triple` - the flag for enabling TDES encryption

Here are some examples for each algorithm.
### DES
Basic encryption:
```
GET https://encryptia.vercel.app/api/des?plaintext=mymessage&key=mykey
```
Encryption with custom mode and initialization vector:
```
GET [...]/api/?plaintext?=mymessage&key=mykey&mode=CBC&iv=myvector
```
Decryption works in a similar way:
```
GET https://encryptia.vercel.app/api/des?ciphertext=7e422822773666c0&key=mykey&[...]
```
Note: the ciphertext will be encoded in Hex format,
### TDES
The endpoint for Triple DES is the same as for DES, and works in a very similar way: you just need to set the extra `triple` parameter:
```
GET [...]/api/des?triple=true&plaintext[...]
```

### AES
Encryption:
```
GET https://encryptia.vercel.app/api/aes?plaintext=mymessage&key=mykey&iv=myvector
```
Decryption:
```
GET https://encryptia.vercel.app/api/aes?ciphertext=ySrGrO2LepqM0LnwLN+oFQ==&key=mykey&iv=myvector
```
Note: the ciphertext will be encoded in Base64 format.

### Response 
The API returns a JSON object of this type:
```
{
    plaintext,
    ciphertext,
    key,
    iv,
    mode
}
```

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Licence 
Distributed under the MIT Licence. See `LICENCE.md` for more information.

## Contributors
Nicolas Guarini - [nicolasguarini.it](https://nicolasguarini.it) - [nicolasguarini.py@gmail.com](mailto:nicolasguarini.py@gmail.com)
