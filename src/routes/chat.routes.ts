import { RequestHandler, Router } from 'express';
import { createChat, getChat } from '../controllers/chat.controller';

const router = Router();

router.post('/', createChat );
router.get('/:id', getChat );

export default router;
