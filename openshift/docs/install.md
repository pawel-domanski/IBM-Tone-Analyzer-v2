docker.pkg.github.com/pawel-domanski/ibm-tone-analyzer-v2/image

docker login -u=ibm-emocje+api_plp50926 -p=LIPTO9NJLDJ4YJQHA59W92PZ34CZZ2NENKV7SGM1OVN77MHEQYDNIKSHHG94PYL4 quay-enterprise-quay-enterprise.quay-enterprise-d-307161-c3d6e5e87e1b5b53c8cbab7b29828047-0001.us-south.containers.appdomain.cloud

docker tag local-image:some-version quay-enterprise-quay-enterprise.quay-enterprise-d-307161-c3d6e5e87e1b5b53c8cbab7b29828047-0001.us-south.containers.appdomain.cloud/ibm-emocje/api-pipeline-v2:latest

docker push quay-enterprise-quay-enterprise.quay-enterprise-d-307161-c3d6e5e87e1b5b53c8cbab7b29828047-0001.us-south.containers.appdomain.cloud/ibm-emocje/api-pipeline-v2:latest