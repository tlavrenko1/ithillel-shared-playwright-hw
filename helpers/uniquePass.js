export class UniquePass {
   static generatePassword() {
        const length = Math.floor(Math.random() * 3) + 8; 
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const digits = '0123456789';
    
        let password = '';

        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += digits.charAt(Math.floor(Math.random() * digits.length));
    
        const allCharacters = uppercase + lowercase + digits;
    
        for (let i = password.length; i < length; i++) {
            password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        }
        password = password.split('').sort(() => Math.random() - 0.5).join('');
    
        return password;
    }
}