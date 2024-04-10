# Connected airlines

This project is created to maintain the Connected airlines project for semester 6 @Fontys.


# AWS Live deployment

## build

```bash
sam build
```

### deploy

```bash
sam deploy --guided
```

---

# Local deployment

```bash
docker-compose up
```

By now localstack is running and shoud give a container id in the logs.

Change the container id and run the following command:

```bash
docker exec -it <container id> bash
```

This should put you in the docker containers CLI. Now run the following command:

```bash
cd /services/services

awslocal cloudformation deploy --stack-name dockerStack --template-file "template.yaml"
```

After localstack finishes, visit the localstack dashboard and see the stack created in cloudformation. 
