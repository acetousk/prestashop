# Getting Started

## Requirements
- Git
- Java JDK version 11
- Node 14+ (16.16.0 tested)
- Yarn version 1 (1.22.18 tested)

## How to start

### Get Moqui Running
This is a simple quick introduction to running Moqui. For more information on how to deploy and develop with Moqui see: [the Moqui Documentation](https://moqui.org/m/docs/framework/Run+and+Deploy#a1.QuickStart).

1. Ensure you have Git installed by running:
```bash
git --version 
```
::: details
It should look something like this:
```bash
me@moqui:~$ git --version
git version 2.34.1
```
If you have troubles installing git, checkout [this Github tutorial](https://github.com/git-guides/install-git) about it.
:::

3. Ensure you have Java installed by running:
```bash
java -version
```
::: details
It should look something like this:
```bash
me@moqui:~$ java -version
openjdk version "11.0.15" 2022-04-19
OpenJDK Runtime Environment GraalVM CE 22.1.0 (build 11.0.15+10-jvmci-22.1-b06)
OpenJDK 64-Bit Server VM GraalVM CE 22.1.0 (build 11.0.15+10-jvmci-22.1-b06, mixed mode, sharing)
```
If you have troubles installing java, checkout [this Moqui tutorial](https://moqui.org/m/docs/framework/Run+and+Deploy#RequiredSoftwareJavaJDK11andElasticSearch).
:::

4. Git clone the Moqui framework

::: warning
This command installs an unofficial fork of Moqui for convenient install. For the true source, see [the Moqui GitHub Organization's code](https://github.com/moqui).
:::

```bash
git clone https://github.com/acetousk/moqui-framework
```

5. Install the [runtime](https://github.com/moqui/moqui-runtime), [Open Search](https://opensearch.org/), and [necessary components](https://github.com/acetousk/moqui-framework/blob/afb99750bed5c0e0166bb74ec50643e6e1f8aa6a/myaddons.xml#L24) with [gradle](https://gradle.org/).
```bash
cd moqui-framework 
./gradlew getRuntime downloadOpenSearch getComponentSet -PcomponentSet=vue-storefront
```

::: details
To make sure everything worked run:
```bash
ls -l runtime/component
```

It should look something like this:
```bash
me@moqui:~/moqui-framework$ ls -l runtime/component/
total 68
drwxrwxr-x 5 desktop desktop 12 Jul 30 09:57 mantle-udm
drwxrwxr-x 8 desktop desktop 17 Jul 30 09:57 mantle-usl
drwxrwxr-x 5 desktop desktop 12 Jul 30 09:57 MarbleERP
drwxrwxr-x 5 desktop desktop 13 Jul 30 09:57 moqui-fop
drwxrwxr-x 7 desktop desktop 16 Jul 30 09:57 PopCommerce
drwxrwxr-x 7 desktop desktop 14 Jul 30 09:57 PopRestStore
-rw-rw-r-- 1 desktop desktop 86 Jul 30 09:57 README
drwxrwxr-x 8 desktop desktop 17 Jul 30 09:57 SimpleScreens
```
:::

6. Build and Run Moqui

::: tip
When running this Vue Storefront application, it is necessary to have Moqui running on an accessible URL. 

It is also necessary to have Open Search or Elastic Search accessible to the Moqui Application see [the Moqui Documentation](https://moqui.org/m/docs/framework/Run+and+Deploy#a7.ElasticSearchConfigurationandInstall) for more information.
:::

```bash
./gradlew build
java -jar moqui.war
```

This will open up Moqui on [http://localhost:8080](http://localhost:8080) by default.

::: tip
When running Moqui, you can go to [http://localhost:8080/toolstatic/lib/swagger-ui/index.html?url=http://localhost:8080/rest/service.swagger/pop#/](http://localhost:8080/toolstatic/lib/swagger-ui/index.html?url=http://localhost:8080/rest/service.swagger/pop#/) to see the auto generated API Documentation.
:::

### Vue Storefront Running

1. Ensure Node 14+ is installed by running:
::: warning
If following the Get Moqui Running tutorial, make sure your working directory is not `moqui-framework`. To do this run: `cd ~`.
:::

```bash
node -v
```
::: details
It should look something like this:
```bash
me@moqui:~$ node -v
v16.16.0
```
:::

2. Ensure Yarn 1 is installed by running:
```bash
yarn -v
```
::: details
It should look something like this:
```bash
me@moqui:~$ yarn -v
1.22.18
```
:::

3. Clone the Moqui integration repository:
```bash
git clone https://github.com/vuestorefront-community/moqui.git
```

4. Install dependencies:
```bash
yarn install
```

5. Build and Run the project:
```bash
yarn dev
```

Vue Storefront should now be up at [http://localhost:3000](http://localhost:3000) check it out!

## How to start if you want to contribute?

Want to contribute? Create a PR or Ping us on `moqui` channel on [our Discord](https://discord.vuestorefront.io)!
