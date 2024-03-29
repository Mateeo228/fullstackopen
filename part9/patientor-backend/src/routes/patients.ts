import express from 'express';
import patientService from '../services/patientService';
import Utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findyById(req.params.id);

  if (patient){
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = Utils.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown ){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.findyById(req.params.id);
    if (!patient){
      res.status(400).send('No patient found, try again with another ID.');
      return;
    }
    const newEntry = Utils.toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, patient);
    res.json(addedEntry);
  } catch (error: unknown ){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;