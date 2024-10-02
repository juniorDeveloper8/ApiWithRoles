import { config } from 'dotenv';
config();


export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'se_mamo_el_men',
}