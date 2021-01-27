import AsyncStorage from '@react-native-async-storage/async-storage';
var RSAKey = require('react-native-rsa');
import cryptojs from "crypto-js";


const baseurl = 'http://192.168.1.200:5000'//


const SHA256 = (text, salt = '') => {
  return cryptojs.SHA256(text + salt).toString()
}

const hash_function = (text) => {
  
  const PBKDF2 = cryptojs.PBKDF2(text,'12345').toString()
  return SHA256(PBKDF2)
}

const AES_encrypt = (text, key) => {
  return cryptojs.AES.encrypt(text, key).toString()
}

const AES_decrypt = (encrypted_text, key) => {
  return cryptojs.AES.decrypt(encrypted_text, key).toString(cryptojs.enc.Utf8);
}




const make_RSA_key = (bits = 1024, exponent = '10001') => {
  var rsa = new RSAKey();
  rsa.generate(bits, exponent);
  var publicKey = rsa.getPublicString();
  var privateKey = rsa.getPrivateString();
  return { privateKey: privateKey, publicKey: publicKey }
}

//console.log(make_RSA_key())


const RSA_encrypt = (text, publicKey) => {
  var rsa = new RSAKey();
  rsa.setPublicString(publicKey);
  var encrypted = rsa.encrypt(text);
  return encrypted
}

const RSA_decrypt = (encrypted_text, privateKey) => {
  var rsa = new RSAKey();
  rsa.setPrivateString(privateKey);
  var decrypted = rsa.decrypt(encrypted_text);
  return decrypted
}

const load_s = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.log('error in load');
  }
}

const save_s = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (e) {
    console.log('error in save');
  }
}

const remove_s = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log('error in remove');
  }
}

const clear_s = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.log('error in clear');
  }
}

//save_s('pass','123').then((res) => {console.log('false')})



hash_function('123')
export {
  baseurl, remove_s, load_s, save_s, clear_s, make_RSA_key, RSA_encrypt, RSA_decrypt,
  AES_decrypt, AES_encrypt, hash_function, SHA256,
}
