# version: 0.1
echo "Enter text:";
read -r text;
curl -X POST -d "$text" -H "Content-Type: text/plain" 192.168.0.60:3005/say
#echo "$text";
