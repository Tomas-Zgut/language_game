import unittest
from adder import load_lines

class TestLoadingFileData(unittest.TestCase):
    
    def test_nonexistent_file(self):
        """TEST nonexistent file supplied"""
        with self.assertRaises(SystemExit) as ec:
            load_lines("nn.txt")
        self.assertEqual(ec.exception.code,1,"Should have exiteed with code 1")



if __name__ == "__main__":
    unittest.main()