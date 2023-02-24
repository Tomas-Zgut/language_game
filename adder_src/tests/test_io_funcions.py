import unittest
from adder import read_lines,read_file

class TestReadLines(unittest.TestCase):
    """TESTS for read_lines function"""

    def test_nonexistent_file(self):
        """TEST nonexistent file supplied"""
        
        with self.assertRaises(FileNotFoundError) as err:
            read_lines("nn.txt")

    def test_exixting_file(self):
        """TEST return of file contets"""
        pass
    
class TestReadFile(unittest.TestCase):
    """TESTS for read_file function"""

    def test_nonexistent_file(self):
        """TEST nonexistent file supplied"""

        with self.assertRaises(FileNotFoundError) as err:
            read_file("nn.txt")
    
    def test_existing_file(self):
        """TEST return of file contets"""
        pass


if __name__ == "__main__":
    unittest.main()