import { useEffect, useState } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

