import { Router } from 'express';
import { param } from 'express-validator';
import { validateReq } from '../middleware/validateReq';
import studentService from '../services/studentService';

const routes = Router();

routes.get(
  '/:classId',
  [param('classId').isString()],
  validateReq,
  async (req, res) => {
    const { classId } = req.params;
    const students = await studentService.getStudentsInClass(classId);
    res.json(students);
  },
);

export default routes;
