# Connected airlines

This project is created to maintain the Connected airlines project for semester 6 @Fontys.

---

# Project stack

This project contains the following tech stack
- React, Mantine
- GoLang
- AWS
- SAM

---

# Run the frontend
To run the frontend, simply run:
```
npm run dev
```

---

# AWS Live deployment of the backend

## build

```bash
sam build
```

### deploy

```bash
sam deploy --guided
```

---

# Local testing of the backend

## Build scripts
Note that the entire backend can only be ran in AWS. However, you can still build the GO files individually to see if they can be built. To buil the GO files:

1. Go to a directory containing a file.go
2. run: `go build .`

## Run Lambda locally
You can also do a little trick with Lambda's to run them locally. When you add the Lambda to the CloudFormation template.yaml file you can run that lambda using this command:
```
sam local invoke "NameOfTheFunctionInTheTemplate" -e path/to/file/containing/event
```

SAM will then build the Lambda in a container on your PC and eject an event into it.
