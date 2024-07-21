# CompilerConnect-API

<img alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/> <img alt="Nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>

API to run C++ and Python code on the cloud :)

BASE URL: #coming soon : )

### Note
```
use <textarea /> to take code input
```

### Endpoint #1
```
/py
```
### Required request body
```
{
    "inputCheck": "true", true || false
    "input": "1
              2",
    "code": "//code"
}
```
### Endpoint #2
```
/cpp
```
### Required request body
```
{
    "inputCheck": "true", true || false
    "input": "1
              2",
    "code": "//code"
}
```
### Endpoint #3
```
/save/cpp
```
### Required request body
```
{
    "inputCheck": "true", true || false
    "input": "1
              2",
    "code": "//code",
    "username": "ujjwalpathaak",
    "password": "*****",
    "filename": "File1.cpp"
}
```
### Endpoint #4
```
/save/py
```
### Required request body
```
{
    "inputCheck": "true", true || false
    "input": "1
              2",
    "code": "//code",
    "username": "ujjwalpathaak",
    "password": "*****",
    "filename": "File1.py"
}
```
### Endpoint #5
```
/newuser
```
### Required request body
```
{
    "username": "ujjwalpathaak",
    "password": "*****"
}
```
### Endpoint #6
```
/getCodeAll
```
### Required request body
```
{
    "username": "ujjwalpathaak",
    "password": "*****"
}
```
### Endpoint #7
```
/getSpecificCode
```
### Required request body
```
{
    "username": "ujjwalpathaak",
    "password": "*****",
    "filename": "File1."
}
```
