Criar pasta para armazenar meus dados
cd ~/Aulas/
mkdir shard_data


Criando um replicaSet:
mkdir -p rs0-0 rs0-1 rs0-2
cd ~/Aulas/

./mongodb/bin/mongod --port 27000 --dbpath ~/Aulas/shard_data/rs0-0 --replSet rs0 --smallfiles --noprealloc
./mongodb/bin/mongod --port 27001 --dbpath ~/Aulas/shard_data/rs0-1 --replSet rs0 --smallfiles --noprealloc
./mongodb/bin/mongod --port 27002 --dbpath ~/Aulas/shard_data/rs0-2 --replSet rs0 --smallfiles --noprealloc

// configurações no mongoshell
./mongodb/bin/mongo --port 27000
rs.initiate()
rs.add("virtualbox:27001")
rs.add("virtualbox:27002")
rs.status()

// Operações normais que se faz no mongo shell
// Inserir um dado dummy:
use aula
db.alunos.insert({"name":"Aula"})

// Comunicação de driver de linguagens (Interface com o mongo)

Para construir um novo shard é necessário mais um replica set
- Abrir novo terminal
- Criando pastas para a replicas
cd ~/Aulas/shard_data
mkdir -p rs1-0 rs1-1 rs1-2
cd ~/Aulas/

./mongodb/bin/mongod --port 27010 --dbpath ~/Aulas/shard_data/rs1-0 --replSet rs1   --smallfiles --noprealloc
./mongodb/bin/mongod --port 27011 --dbpath  ~/Aulas/shard_data/rs1-1 --replSet rs1   --smallfiles --noprealloc
./mongodb/bin/mongod --port 27012 --dbpath  ~/Aulas/shard_data/rs1-2 --replSet rs1 --smallfiles --noprealloc

./mongodb/bin/mongo --port 27010
rs.initiate()
rs.add("virtualbox:27011")
rs.add("virtualbox:27012")
rs.status()


// Criando um shard
Ligar o config server:
cd shard_data
mkdir config
cd ~/Aulas/


./mongodb/bin/mongod --configsvr --dbpath ~/Aulas/shard_data/config --port 20001
./mongodb/bin/mongos --configdb virtualbox:20001 --port 27017 --chunkSize 1

./mongodb/bin/mongo
 sh.addShard("rs0/virtualbox:27000,virtualbox:27001,virtualbox:27002")
 sh.addShard("rs1/virtualbox:27010,virtualbox:27011,virtualbox:27012")

// Mostrar que leu as coleções do shard antigo

 sh.enableSharding("aula")
 db.alunos.createIndex({name:1})
 sh.shardCollection("aula.alunos",{name:1})




