import unittest
from adder import transfrom_data

class TestTransformData(unittest.TestCase):

    def test_incorrcet_data_format(self):
        """TEST incorrect data format"""
        with self.assertRaises(SystemExit) as ec:
            transfrom_data(["abcde"],",")
        self.assertEqual(ec.exception.code,1,"Should have exited with code 1")


    def test_correct_data_worng_delim(self):
        """TEST worng delimiter supplied"""
        with self.assertRaises(SystemExit) as ec:
            transfrom_data(["a,b,c,d,e,f"],"/")
        self.assertEqual(ec.exception.code,1,"Should have exited with code 1")


    def test_correct_data_handle(self):
        """TEST correct data handle"""
        data = transfrom_data(["a,b,c,d,e,f"],",")
        expected_out = {"clues":["a","b","c","d","e"], "answer":"f"}
        self.assertDictEqual(data[0],expected_out,f"{data} should be the same as {expected_out}")




    if __name__ == "__main__":
        unittest.main()